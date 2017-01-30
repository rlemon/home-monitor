import express from 'express';
import apiEndpoints from './api';

import passport from 'passport';
import Strategy from 'passport-github';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import query from './modules/db-promise';
import config from './config';

const app = express();
const rootPath = `${__dirname}/../static`; // up to lib, I start it from /lib/server

/* auth handling */

const {clientID, clientSecret, callbackURL} = config;
passport.use(new Strategy({clientID, clientSecret, callbackURL}, authHandler));
passport.serializeUser((user, cb) => {
	cb(null, user);
});
passport.deserializeUser((obj, cb) => {
	if( !( 'oauthid' in obj ) ) return cb('invalid object', obj);
	const params = {
		text: `
			SELECT
				userid, oauthid ,login, gravatar_id, avatar_url, html_url, gists_url, email, blog, location,
				CAST(joined as TEXT) as joined
			FROM profile_details WHERE oauthid = $1
		`,
		values: [obj.oauthid]
	};
	query(params).then(rows => cb(null, rows )).catch(err => cb(err, null));
});

function authHandler(accessToken, refreshToken, profile, cb) {
	return findOrCreate(profile._json, cb);
}

function findOrCreate(profile, cb) {
	const params = {
		text: `
			SELECT * FROM profile_details WHERE oauthid = $1
		`,
		values: [profile.id]
	};
	query(params).then(rows => {
		if( rows.length === 0 ) {
			return createUser(profile, cb);
		}
		cb(null, rows[0]);
	}).catch(err => cb(err, profile));
}

function createUser(profile, cb) {
	const {id, login, gravatar_id, avatar_url, html_url, gists_url, email, blog, location} = profile;
	const params = {
		text: `
			INSERT INTO profile_details
				(oauthid ,login, gravatar_id, avatar_url, html_url, gists_url, email, blog, location)
			VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9 )
		`,
		values: [id, login, gravatar_id, avatar_url, html_url, gists_url, email, blog, location]
	};
	query(params).then( _ => cb(null, profile)).catch(err => cb(err, profile));
}

/* parsers */
app.use(cookieParser()); // do I need this for xhr/fetch only?
app.use(bodyParser.json());
app.use(bodyParser({ extended: true }));
app.use(session({ secret: config.sessionKey, resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

/* assets */

app.use(express.static(rootPath));

/* auth endpoints */
// FUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUK (┛ಸ_ಸ)┛彡┻━┻
app.get('/login/github', passport.authenticate('github'));
// redirect? can I send back some json instead?
// app.post('/login/github/return', (req, res, next) => {
// 	passport.authenticate('github', (err, user, info) => {
// 		if( err ) return next( err );
// 		req.login(user, err => {
// 			if( err ) return next( err );
// 			console.log('here');
// 			res.json({message: 'authenticated'});
// 			//res.end(`<script>opener.handlePopupClosure(${JSON.stringify({detail: info})}); window.close();</script>`)
// 		});
// 		// I don't actually need to pass anything here.. but I can.
// 	})(req, res, next);
// });
app.get('/login/github/return', passport.authenticate('github', ({failureRedirect: '/login'})), (req, res, next) => {
	// let path = '/';
	// if( req.session && req.session.redirectTo ) {
	// 	path = req.session.redirectTo;
	// 	delete req.session.redirectTo;
	// }
	// res.redirect(path);
	res.setHeader('Content-Type', 'text/html');
	res.end(`<script>opener.authenticationCompleteCallback(); window.close();</script>`);
});

// app.get('/profile', (req, res) => {
// 	res.json(req.user);
// })

app.post('/logout', (req, res, next) => {
	if( !( 'user' in req ) ) {
		return res.end();
	}
	next();
}, (req, res, next) => {
	req.logout();
	req.session.destroy();
	res.json({});
});

/*
	handles requests going to /api/whatever
*/

app.use('/api', apiEndpoints);

/*
	handles requests going to all other pages
*/

app.use((req, res, next) => {
	res.sendFile('/index.html', {
		root: rootPath,
		headers: {
			'Content-Type': 'text/html'
		}
	}, err => {
		if( err ) {
			console.error(err);
			res.status(err.status).end();
		}
	});
});

app.listen(7333, console.log.bind(console, 'app listening on 7333'));
