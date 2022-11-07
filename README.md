This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## TODO

Auth
1. [...nextauth].js: signin and signup functions in authorize

Validation Tasks
1. /dashboard/validation_tasks (index.js): Replace get current validator all validation tasks with getValidationTasks function in actions/validation_task

2. /dashboard/validation_tasks/id/add_validation_suite (add_validation_suite.js): Implement getTestCodes function in actions/test_code to search test codes. Return test codes with params if the plugin's validate function specify a set of params. Check detailed data structure in actions/test_code.

3. /dashboard/validation_tasks/id/add_validation_suite (add_validation_suite.js): Implement addValidationSuite function in actions/test_code to search test codes.

4. /dashboard/validation_tasks/id/edit_validation_suite (edit_validation_suite.js): Implement getValidationSuite function in actions/validation_suite to query validation_suite by id. Check detailed data structure in actions/validation_suite. 

5. /dashboard/validation_tasks/id/edit_validation_suite (edit_validation_suite.js): Implement updateValidationSuite function in actions/validation_suite to update validation_suite.

Validator Manager Dashboard
1. /dashboard/manager/validation_models: Implement get validators functions belongs to validator manager.

2. /dashboard/manager/validation_models: Implement get models functions belongs to validator manager.

3. /dashboard/manager/validation_models: Implement assign models to a validator, under the hood, this action will update a validation task with validator id (such validation task should be created by gatekeeper).

4. /dashboard/manager/test_codes: Implement get test codes from managed validators (through his managed validators). 

5. /dashboard/manager/test_codes: Implement sign off test code action for managed validators.


GateKeeper Dashboard
1. /dashboard/gatekeeper/validation_models: Implement get models functions belongs to current group.

2. /dashboard/gatekeeper/validation_models: Implement assign models to a manager, under the hood, this action will create a validation task with assigned manager id and model id.

4. /dashboard/gatekeeper/test_codes: Implement get test codes from group. 

5. /dashboard/gatekeeper/test_codes: Implement make test code public to all action.


Admin
1. /admin/users: Get all users

2. /admin/users: Assign a user to a role

3. /admin/users: Assign a user to a group

4. /admin/test_codes: Get all test codes (view only for now)

5. /admin/groups: Create new group