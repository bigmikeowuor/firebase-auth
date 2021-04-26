// firebase configuration
let firebaseConfig = {
	apiKey: 'AIzaSyDF937Gy0H0f8BkjhxurqdAJmoAFzbuu84',
	authDomain: 'vue-firebase-auth-swap.firebaseapp.com',
	databaseURL:
		'https://vue-firebase-auth-swap-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'vue-firebase-auth-swap',
	storageBucket: 'vue-firebase-auth-swap.appspot.com',
	messagingSenderId: '1056730425850',
	appId: '1:1056730425850:web:a4e99fa6d25d00687d5c43',
};

// initialize firebase
firebase.initializeApp(firebaseConfig);

// vue.js instance
var app = new Vue({
	el: '#app',

	data: {
		email: '',
		password: '',
		newPassword: '',
		authUser: null,
		displayName: null,
		photoURL: null,
		favoriteFood: '',
	},

	methods: {
		register() {
			firebase
				.auth()
				.createUserWithEmailAndPassword(this.email, this.password)
				.then(() => console.log('Registration successful...'))
				.catch((error) => alert(error.message));
			this.clearFields();
		},

		signOut() {
			firebase
				.auth()
				.signOut()
				.then(() => console.log('Sign out successful...'));
			this.clearFields();
		},

		signIn() {
			firebase
				.auth()
				.signInWithEmailAndPassword(this.email, this.password)
				.then(() => console.log('Sign in successful...'))
				.catch((error) => alert(error.message));
			this.clearFields();
		},

		signInWithGoogle() {
			const provider = new firebase.auth.GoogleAuthProvider();

			firebase
				.auth()
				.signInWithPopup(provider)
				.then(() => console.log('Sign in with Google successful...'))
				.catch((error) => alert(error.message));
		},

		linkWithGoogle() {
			const provider = new firebase.auth.GoogleAuthProvider();

			this.authUser
				.linkWithPopup(provider)
				.then(() => console.log('Link with Google successful...'))
				.catch((error) => alert(error.message));
		},

		unlinkFromGoogle() {
			this.authUser
				.unlink('google.com')
				.then(() => console.log('Unlink from Google successful...'))
				.catch((error) => alert(error.message));
		},

		updateProfile() {
			this.authUser
				.updateProfile({
					displayName: this.displayName,
					photoURL: this.photoURL,
				})
				.then(() => console.log('Profile update successful...'))
				.catch((error) => alert(error.message));
		},

		updateEmail() {
			this.authUser
				.updateEmail(this.email)
				.then(() => console.log('Email update successful...'))
				.catch((error) => alert(error.message));
			this.clearFields();
		},

		updatePassword() {
			this.authUser
				.updatePassword(this.newPassword)
				.then(() => console.log('Password update successful...'))
				.catch((error) => alert(error.message));
			this.clearFields();
		},

		updateCustomDetails() {
			firebase
				.database()
				.ref('users')
				.child(this.authUser.uid)
				.update({ favoriteFood: this.favoriteFood })
				.then(() => console.log('Custom details updated successfully...'))
				.catch((error) => alert(error.message));
			this.clearFields();
		},

		clearFields() {
			this.email = '';
			this.password = '';
			this.newPassword = '';
			this.favoriteFood = '';
		},
	},

	computed: {
		linkedToGoogle() {
			return !!this.authUser.providerData.find(
				(provider) => provider.providerId === 'google.com'
			);
		},

		linkedToPassword() {
			return !!this.authUser.providerData.find(
				(provider) => provider.providerId === 'password'
			);
		},
	},

	created() {
		firebase.auth().onAuthStateChanged((user) => {
			this.authUser = user;

			if (user) {
				this.displayName = user.displayName;
				this.photoURL = user.photoURL;
				this.email = user.email;
				firebase
					.database()
					.ref('users')
					.child(user.uid)
					.once('value', (snapshot) => {
						if (snapshot.val()) {
							this.favoriteFood = snapshot.val().favoriteFood;
							Vue.set(this.authUser, 'favoriteFood', this.favoriteFood);
						}
					});
			}
		});
	},
});
