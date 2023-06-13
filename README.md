```bash
npm install

# Run the frontend
npm run dev

# Run the Studio
Start it locally `pscale connect tutorial-db test --port 3309`
TO work on the main branch `pscale connect tutorial-db main-2023-01-15-22-38-28 --port 3309`

push database `npx prisma db push`

db browser `npx prisma studio`

The blog will be running at `http://localhost:3000`, the Studio will run at `http://localhost:3333`.

Change url callback https://github.com/settings/apps/tokenomics-hub
https://console.cloud.google.com/apis/credentials?project=quickstart-1607506315148


Template used
https://github.com/sanity-io/sanity-template-nextjs-blog-comments/tree/d414580b737a65fdd12ce820f2d1792d845f1647

Run stripe webhooks in testmode

 stripe listen --forward-to localhost:3000/api/stripeHook

 stripe trigger checkout.session.completed \
  --add "checkout_session:client_reference_id=user_2JGKXMvgTJldPjQnfdUt6ak0jVe" \
  --add "checkout_session:customer=cus_NsBPHJih1ZZL0C"

  