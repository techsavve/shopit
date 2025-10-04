
export type IRegisterUser = {
	first_name: string,
	second_name: string,
	email_address: string;
	password: string;
};

export type ILoginUser = {
	email_address: string;
	password: string;
};

export type ISendConfirmation = {
	email_address: string;
};

export type IConfirmCode = {
	email_address: string;
	code: string
};
export type IConfirmCodeResponse = {
	email: string,
	token: string
};

export type IChangePassword = {
	token: string,
	password: string,
	confirm_password: string
};

export type IAuth = {
    id: string;
	access_token: string;
	refresh_token: string;
}

export type IWebAuth = {
	id: string;
	web_token: string;
	created_at: string;
}

export type IWebSuccess = {
	message: string
}

