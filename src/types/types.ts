export type RegisterUserFormData = {
	firstName?: string;
	lastName?: string;
	username?: string;
	password?: string;
	confirmPassword?: string;
	[key: string]: string | undefined;
};
export type User = {
	firstName?: string;
	lastName?: string;
	username: string;
	password: string;
};
