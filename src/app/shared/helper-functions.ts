export class HelperFunctions {
    static extractErrorMessages(errorResponse: any): string[] {
        const errorMessages: string[] = [];
        if (errorResponse.errors) {
            for (const key in errorResponse.errors) {
                if (errorResponse.errors.hasOwnProperty(key)) {
                    errorMessages.push(...errorResponse.errors[key]);
                }
            }
        }
        return errorMessages;
    }
}


