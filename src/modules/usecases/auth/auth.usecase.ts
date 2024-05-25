
export abstract class AuthUseCase {
    // TODO: CHANGE THIS PROMISE<> TYPE
    public abstract login(username: string, password: string): Promise<any>;
}
