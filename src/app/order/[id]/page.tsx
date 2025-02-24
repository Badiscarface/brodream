import Thankyou from '@/components/thankYou';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const response = await fetch(process.env.BASE_URL + '/api/orders/' + id).then(
    (res) => res.json()
  );

  const { data } = response;
  return (
    <Thankyou
      id={id}
      data={data}
    />
  );
}
