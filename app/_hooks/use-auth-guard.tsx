type GuardType = "public" | "protected";

export function useAuthGuard(_type: GuardType = "protected") {
    const isSignedIn = true;
    const isAllowed = true;

    return {
        isSignedIn,
        isAllowed,
        isLoading: false,
    };
}
