import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TravelKnowledge',
  description: 'Explore interesting places around the world',
};

export default function Head() {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    </>
  );
}
