import { toast } from 'react-toastify';

const handleGraphQlErrors = (graphQlErrors, expectedError, flag): any => {
    const errors = graphQlErrors.map(graphQlError => {
        const res = graphQlError.extensions.exception.response;
        if (flag && res.statusCode === expectedError.code) {
            if (expectedError.message) {
                toast.error(`👎🏻 ${expectedError.message}`);
            } else if (res.message) {
                toast.error(`👎🏻 ${res.message}`);
            }
        }

        console.log(JSON.stringify(graphQlError, null, 2));

        return {
            statusCode: res.statusCode,
            error: res.error,
            message: res.message
        };
    });

    return errors;
};

interface ErrorHandler {
    errors: any;
    expectedError: {
        code: number;
        message?: string;
    };
    flag: boolean;
}

const errorHandler = ({ errors, expectedError, flag = true }: any): any => {
    console.log(errors);
    const { graphQLErrors } = errors;
    if (graphQLErrors)
        return handleGraphQlErrors(graphQLErrors, expectedError, flag);
};

export { errorHandler };

// {
//     "errors": [
//       {
//         "message": {
//           "statusCode": 409,
//           "error": "Conflict",
//           "message": "Email is already taken"
//         },
//         "locations": [
//           {
//             "line": 2,
//             "column": 3
//           }
//         ],
//         "path": [
//           "createUser"
//         ],
//         "extensions": {
//           "code": "INTERNAL_SERVER_ERROR",
//           "exception": {
//             "response": {
//               "statusCode": 409,
//               "error": "Conflict",
//               "message": "Email is already taken"
//             },
//             "status": 409,
//             "message": {
//               "statusCode": 409,
//               "error": "Conflict",
//               "message": "Email is already taken"
//             },
//             "stacktrace": [
//               "Error: [object Object]",
//               "    at Function.conflict (/Users/olliethomas/code/nest-prisma/dist/error/error.service.js:21:15)",
//               "    at UsersResolver.createUser (/Users/olliethomas/code/nest-prisma/dist/users/users.resolver.js:37:42)",
//               "    at processTicksAndRejections (internal/process/task_queues.js:86:5)"
//             ]
//           }
//         }
//       }
//     ],
//     "data": null
//   }

// [
//     {
//       "message": {
//         "statusCode": 401,
//         "error": "Unauthorized"
//       },
//       "locations": [
//         {
//           "line": 2,
//           "column": 3
//         }
//       ],
//       "path": [
//         "login"
//       ],
//       "extensions": {
//         "code": "INTERNAL_SERVER_ERROR",
//         "exception": {
//           "response": {
//             "statusCode": 401,
//             "error": "Unauthorized"
//           },
//           "status": 401,
//           "message": {
//             "statusCode": 401,
//             "error": "Unauthorized"
//           },
//           "stacktrace": [
//             "Error: [object Object]",
//             "    at Function.unauthorized (/Users/olliethomas/code/nest-prisma/dist/error/error.service.js:18:15)",
//             "    at LocalStrategy.validate (/Users/olliethomas/code/nest-prisma/dist/auth/local.strategy.js:27:42)"
//           ]
//         }
//       }
//     }
//   ]
