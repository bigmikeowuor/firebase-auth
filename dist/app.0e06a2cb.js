parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"A2T1":[function(require,module,exports) {
var e={apiKey:"AIzaSyDF937Gy0H0f8BkjhxurqdAJmoAFzbuu84",authDomain:"vue-firebase-auth-swap.firebaseapp.com",databaseURL:"https://vue-firebase-auth-swap-default-rtdb.europe-west1.firebasedatabase.app",projectId:"vue-firebase-auth-swap",storageBucket:"vue-firebase-auth-swap.appspot.com",messagingSenderId:"1056730425850",appId:"1:1056730425850:web:a4e99fa6d25d00687d5c43"};firebase.initializeApp(e);var t=new Vue({el:"#app",data:{email:"",password:"",newPassword:"",authUser:null,displayName:null,photoURL:null,favoriteFood:""},methods:{register:function(){firebase.auth().createUserWithEmailAndPassword(this.email,this.password).then(function(){return console.log("Registration successful...")}).catch(function(e){return alert(e.message)}),this.clearFields()},signOut:function(){firebase.auth().signOut().then(function(){return console.log("Sign out successful...")}),this.clearFields()},signIn:function(){firebase.auth().signInWithEmailAndPassword(this.email,this.password).then(function(){return console.log("Sign in successful...")}).catch(function(e){return alert(e.message)}),this.clearFields()},signInWithGoogle:function(){var e=new firebase.auth.GoogleAuthProvider;firebase.auth().signInWithPopup(e).then(function(){return console.log("Sign in with Google successful...")}).catch(function(e){return alert(e.message)})},linkWithGoogle:function(){var e=new firebase.auth.GoogleAuthProvider;this.authUser.linkWithPopup(e).then(function(){return console.log("Link with Google successful...")}).catch(function(e){return alert(e.message)})},unlinkFromGoogle:function(){this.authUser.unlink("google.com").then(function(){return console.log("Unlink from Google successful...")}).catch(function(e){return alert(e.message)})},updateProfile:function(){this.authUser.updateProfile({displayName:this.displayName,photoURL:this.photoURL}).then(function(){return console.log("Profile update successful...")}).catch(function(e){return alert(e.message)})},updateEmail:function(){this.authUser.updateEmail(this.email).then(function(){return console.log("Email update successful...")}).catch(function(e){return alert(e.message)}),this.clearFields()},updatePassword:function(){this.authUser.updatePassword(this.newPassword).then(function(){return console.log("Password update successful...")}).catch(function(e){return alert(e.message)}),this.clearFields()},updateCustomDetails:function(){firebase.database().ref("users").child(this.authUser.uid).update({favoriteFood:this.favoriteFood}).then(function(){return console.log("Custom details updated successfully...")}).catch(function(e){return alert(e.message)}),this.clearFields()},clearFields:function(){this.email="",this.password="",this.newPassword="",this.favoriteFood=""}},computed:{linkedToGoogle:function(){return!!this.authUser.providerData.find(function(e){return"google.com"===e.providerId})},linkedToPassword:function(){return!!this.authUser.providerData.find(function(e){return"password"===e.providerId})}},created:function(){var e=this;firebase.auth().onAuthStateChanged(function(t){e.authUser=t,t&&(e.displayName=t.displayName,e.photoURL=t.photoURL,e.email=t.email,firebase.database().ref("users").child(t.uid).once("value",function(t){t.val()&&(e.favoriteFood=t.val().favoriteFood,Vue.set(e.authUser,"favoriteFood",e.favoriteFood))}))})}});
},{}]},{},["A2T1"], null)
//# sourceMappingURL=/app.0e06a2cb.js.map