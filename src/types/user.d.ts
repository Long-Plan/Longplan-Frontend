export type AccType = "MISEmpAcc" | "StdAcc";

export type UserDTO = {
	cmuitaccount_name: string;
	cmuitaccount: string;
	student_id: string;
	prename_id: string;
	prename_TH: string;
	prename_EN: string;
	firstname_TH: string;
	firstname_EN: string;
	lastname_TH: string;
	lastname_EN: string;
	organization_code: string;
	organization_name_TH: string;
	organization_name_EN: string;
	itaccounttype_id: AccType;
	itaccounttype_TH: string;
	itaccounttype_EN: string;
};

export type User = {
	account: string;
	student_id: string;
	prename: string;
	first_name: string;
	last_name: string;
	organization_name: string;
	type: AccType;
};
