app.service('profileService', function($http) {
	var baseUrl = 'http://localhost:8081'

	this.serviceTest = function() {
  console.log('profileService is connected!');
}

	this.saveProfile = function(profile) {
  		$http({ // Requests that your profile be added to the database
   			  method: 'POST'
  			, url: baseUrl + '/api/profiles'
  			, data: profile
  		})
  		.then(function(profileResponse) { // What to do after a response comes back from the server.
  			localStorage.setItem('profileId', JSON.stringify({ profileId: profileResponse.data._id })); // Save our unique _id to local storage
  		
  		})
  		.catch(function(err) {
    		console.error(err);
  });
}


	this.checkForProfile = function(profileId) {
		return $http({
			method: 'GET'
			, url: baseUrl + '/api/profiles' + profileId
		});
	}

	this.deleteProfile = function() {
		var profileId = JSON.parse(localStorage.getItem('profileId')).profileId;

		return $http({
			method: 'DELETE'
			, url: baseUrl + '/api/profiles/' + profileId
		});
	}
});