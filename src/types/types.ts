export type RegisterUserFormData = {
	firstName?: string;
	lastName?: string;
	username?: string;
	password?: string;
	confirmPassword?: string;
	[key: string]: string | undefined;
};
export type UserProfile = {
	firstName: string;
	lastName: string;
	birthDate: string;
	phoneNumber: string;
	address?: string;
	imageUrl?: string;
	gender: string;
};
export type User = {
	firstName?: string;
	lastName?: string;
	username: string;
	password: string | null;
	role?: string;
	profile?: UserProfile;
};
export enum Role {
  Doctor = "DOCTOR",
  Nurse = "NURSE",
  CareGiver = "CAREGIVER",
  Companion = "COMPANION",
}


