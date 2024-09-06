import { User } from "types";
import { getUserDataQuery } from "./queries";

export async function getUserDataQuerySelector() {
	const { result } = await getUserDataQuery();
	const userData: User = {
		account: result.cmuitaccount,
		student_id: result.student_id,
		prename: result.prename_TH,
		first_name: result.firstname_TH,
		last_name: result.lastname_TH,
		organization_name: result.organization_name_TH,
		type: result.itaccounttype_id,
		// type: "MISEmpAcc"
	};

	return {
		userData,
	};
}
