export interface User{
    _id: string
    firstName: string;
    lastName: string;
    email: string;
    clearance: number;
    photo: string;
    phoneNumbers: string[];
}

export interface KartoffelUser{
    id: string;
    adfsId: string;
    genesisId: string;
    name: { firstName: string, lastName: string };
    email: string;
    displayName: string;
    upn: string;
    provider: string;
    entityType: string;
    job: string;
    phoneNumbers: string[];
    clearance: string;
    photo: string;
    jti: string;
    iat: number;
    exp: number;
}