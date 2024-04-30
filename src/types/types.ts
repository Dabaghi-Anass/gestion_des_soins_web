export type RegisterUserFormData = {
	firstName?: string;
	lastName?: string;
	username?: string;
	password?: string;
	confirmPassword?: string;
	[key: string]: string | undefined;
};
export type BaseEntity = {
	creationDate?: Date;
	lastModifiedDate?: Date;
}
export type UserProfile =BaseEntity & {
	birthDate?: Date;
	phoneNumber?: string;
	address?: string;
	imageUrl?: string;
	gender?: string;
	id?: number;
	[key : string]: any;
};
export type User =BaseEntity & {
	firstName?: string;
	lastName?: string;
	username: string;
	password: string | null;
	role?: string;
	profile?: UserProfile;
	id?: number;
	isVerified?: boolean;
};
export enum Role {
	Doctor = "DOCTOR",
  Nurse = "NURSE",
  CareGiver = "CAREGIVER",
  Companion = "COMPANION",
}
export enum FileType {
  pdf = "pdf",
  doc = "doc",
  zip = "zip"
}
export type RegisterProfileFormData = UserProfile;
