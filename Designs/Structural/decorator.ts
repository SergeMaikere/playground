
/*=================================
=            DECORATOR            =
=================================*/

type Profile = {
	data:  ProfileData
	display: () => void
}

interface ProfileData {
	name: string
	email: string
	profilePic: string
	bio?: string
	socials?: string | string[]
}


export const getBasicProfile = ( name: string, email: string, profilePic: string ): Profile => {
	return {
		data: { name, email, profilePic },

		display: () => {
			console.log(`Name: ${name}`);
	        console.log(`Email: ${email}`);
	        console.log(`Profile Picture: ${profilePic}`);
		}
	}
}

export const addBio = (bio: string, profile: Profile): Profile => {

	return {
		data: { ...profile.data, bio: bio },

		display: () => {
			profile.display()
			console.log(`Bio: ${bio}`)
		}
	}
}

export const addSocialMediaLinks = (socials: string | string[], profile: Profile): Profile => {

	return {
		data: { ...profile.data, socials },

		display: () => {
			profile.display()
			if ( typeof socials === 'string' ) 
				console.log(`Soclials Medias: ${socials}`)
			else
				for ( const social of socials ) console.log(social)
		}
	}
}

