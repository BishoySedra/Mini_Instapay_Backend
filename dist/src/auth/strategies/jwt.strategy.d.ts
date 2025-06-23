import { Strategy } from 'passport-jwt';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: any): {
        id: any;
        email: any;
        name: any;
        isAdmin: any;
        phone: any;
        address: any;
        dailyLimit: any;
    };
}
export {};
