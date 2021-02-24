// firebase configuration
let firebaseConfig = {
	apiKey: 'AIzaSyARnOQnc7YLKd8vG-eqCNAtMCX0Cgu5sZQ',
	authDomain: 'vue-http-demo-mo.firebaseapp.com',
	databaseURL: 'https://vue-http-demo-mo-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'vue-http-demo-mo',
	storageBucket: 'vue-http-demo-mo.appspot.com',
	messagingSenderId: '561930183755',
	appId: '1:561930183755:web:381946c19b3979e04a19ce',
};

// initialize firebase
firebase.initializeApp(firebaseConfig);

// vue.js instance
var app = new Vue({
	el: '#app',

	data: {
		email: '',
		password: '',
		authUser: null,
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

		clearFields() {
			this.email = '';
			this.password = '';
		},
	},

	created() {
		firebase.auth().onAuthStateChanged((user) => {
			this.authUser = user;
		});
	},
});
