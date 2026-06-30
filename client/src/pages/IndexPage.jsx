import { usePlaces } from '../../hooks';
import Spinner from '@/components/ui/Spinner';
import PlaceCard from '@/components/ui/PlaceCard';

const IndexPage = () => {
  const allPlaces = usePlaces();
  const { places = [], loading = false } = allPlaces;

  const tempPlaces = [
    {
      _id: "1",
      title: "Luxury Beach Villa",
      address: "Goa, India",
      price: 4500,
      photos: [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
      ],
    },
    {
      _id: "2",
      title: "Modern City Apartment",
      address: "Mumbai, India",
      price: 3200,
      photos: [
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
      ],
    },
    {
      _id: "3",
      title: "Mountain Cabin Retreat",
      address: "Manali, Himachal Pradesh",
      price: 2800,
      photos: [
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800",
      ],
    },
    {
      _id: "4",
      title: "Lake View Cottage",
      address: "Udaipur, Rajasthan",
      price: 3800,
      photos: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      ],
    },
    {
      _id: "5",
      title: "Luxury Penthouse",
      address: "Bengaluru, Karnataka",
      price: 6000,
      photos: [
        "https://images.unsplash.com/photo-1494526585095-c41746248156?w=800",
      ],
    },
    {
      _id: "6",
      title: "Forest Tree House",
      address: "Coorg, Karnataka",
      price: 5200,
      photos: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
      ],
    },
    {
      _id: "7",
      title: "Heritage Haveli",
      address: "Jaipur, Rajasthan",
      price: 4100,
      photos: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      ],
    },
    {
      _id: "8",
      title: "Snow View Chalet",
      address: "Shimla, Himachal Pradesh",
      price: 4700,
      photos: [
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
      ],
    },
  ];

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="grid grid-cols-1 justify-items-center py-32 px-4 md:grid-cols-2 md:gap-0 lg:grid-cols-3 lg:gap-2 xl:grid-cols-4 xl:gap-10">
      {/* {places?.length > 0 ? (
        places.map((place) => <PlaceCard place={place} key={place._id} />)
      ) : ( */}
      {tempPlaces.length > 0 ? (
        tempPlaces.map((place) => (
          <PlaceCard place={place} key={place._id} />
        ))
      ) : (
        <div className="absolute left-1/2 right-1/2 top-40 flex  w-full -translate-x-1/2 transform flex-col p-10  md:w-1/2">
          <h1 className="text-3xl font-semibold">Result not found!</h1>
          <p className="text-lg font-semibold">
            Sorry, we couldn&#39;t find the place you&#39;re looking for.
          </p>
          <button className="mt-4 w-32 rounded-full bg-primary p-2 text-white">
            <a href="/" className="flex items-center justify-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Go back
            </a>
          </button>
        </div>
      )}
    </div>
  );
};

export default IndexPage;
