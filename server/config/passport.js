import passport from "passport";
import { User } from "../models/index.js";
import { Strategy as GithubStrategy } from "passport-github2";

passport.use(
    new GithubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_CALLBACK_URL,
            passReqToCallback: true,
        },
        async (req, accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ githubId: profile.id });
                let isNewUser = false;
                // existing User
                if (!user) {
                    const email = profile.emails?.[0]?.value;

                    if (!email) {
                        return done(
                            new Error("Email was not found in Github Profile!"),
                            null,
                        );
                    }
                    // checking if email Already exists to link accounts
                    user = await User.findOne({ email });
                    if (user) {
                        user.githubId = profile.id;
                        user.provider = "github";
                        await user.save();
                    } else {
                        user = await User.create({
                            name:
                                profile.displayName ||
                                profile.username ||
                                email.split("@")[0],
                            email,
                            provider: "github",
                            githubId: profile.id,
                            avatar: profile.photos?.[0]?.value,
                        });
                        isNewUser = true;
                    }
                }
                req.authAction = isNewUser ? "register" : "login";
                return done(null, user);
            } catch (err) {
                return done(err, null);
            }
        },
    ),
);

export default passport;
