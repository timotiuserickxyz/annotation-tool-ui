import { AUTH_URL, postExternal } from '../core';
import { Response } from '../types/base';

interface TeamMember {
    userId: string;
    userName: string;
    fullName: string;
    photoImage: string;
}

interface ApplicationList {
    id: number;
    companyId: number;
    applicationId: number;
}

interface UserResponse {
    id: string;
    guid: string;
    userName: string;
    fullName: string;
    mobilePhone: string;
    photoImage: string | null;
    roleId: number;
    roleName: string;
    isAdministrator: boolean;
    isSuperadmin: boolean;
    isFirstLogin: boolean;
    isActive: boolean;
    email: string;
    supervisorUserName: string | null;
    supervisorFullName: string | null;
    managerUserName: string | null;
    managerFullName: string | null;
    companyId: number;
    companyName: string;
    teamId: number | null;
    teamName: number | null;
    branchId: number;
    branchName: string;
    prefectureId: number | null;
    prefectureName: number | null;
    cityId: number | null;
    cityName: string | null;
    teamMember: TeamMember[] | null;
    applicationList: ApplicationList[] | null;
}

export interface LoginParams {
    userName: string;
    password: string;
    rememberMe: boolean;
}

export type LoginResponse = {
    submissionStatus: string;
    reason: string;
    userResponse: UserResponse;
    message: string;
    token: string;
    submissionObject: string | null;
    isSubmissionSuccess: string | null;
};

export async function login(params: LoginParams): Promise<Response<LoginResponse>> {
    const login_url = '/api/user/signin';
    const { data, error } = await postExternal(login_url, {
        params,
    });

    return {
        data: data ?? null,
        error: error ?? null,
        loading: !error && !data,
    };
}
