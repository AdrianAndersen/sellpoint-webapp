import type { NextApiRequest, NextApiResponse } from "next";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req: NextApiRequest, res: NextApiResponse) => {
  const listings = [
    {
      title: "Min første annonse",
      imageURL:
        "https://images.unsplash.com/photo-1612135945668-0c2190dfac07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque faucibus, metus eget sollicitudin congue, elit nisl convallis lectus, sed tristique ex risus ac mauris. Donec lobortis augue viverra ex ornare aliquam. Sed ornare euismod aliquam. Donec varius augue quis urna gravida tempus. Sed eu auctor mauris. Donec vel accumsan purus. Nam non tincidunt magna. Aenean vehicula, ex id dictum dapibus, nisl dui tempus turpis, ut maximus tortor ante at magna. Integer tincidunt, magna vel lacinia dapibus, felis leo ultrices metus, ac hendrerit ipsum ante quis eros. Donec condimentum mauris at euismod maximus. Donec ac nisl sagittis, rhoncus urna sit amet, blandit purus. Donec sed egestas lectus, in efficitur neque. Praesent ornare fringilla enim, ac mattis elit ultricies ac. Morbi gravida justo vel convallis euismod. Mauris viverra mauris in convallis ultricies. Suspendisse vehicula, risus non molestie commodo, tortor quam ultricies mi, id fermentum turpis orci sit amet eros. Pellentesque vel tempor metus. Fusce purus felis, maximus non lacus vitae, fringilla laoreet quam. Morbi fermentum finibus semper. Pellentesque pulvinar mollis facilisis.",
      createdBy: "ola.halvorsen@gmail.com",
      price: "123",
      email: "ola.halvorsen@gmail.com",
      name: "Ola Halvorsen",
      phone: "98765432",
    },
    {
      title: "Min andre annonse",
      imageURL:
        "https://images.unsplash.com/photo-1612174462937-171b1f2e7e68?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque faucibus, metus eget sollicitudin congue, elit nisl convallis lectus, sed tristique ex risus ac mauris. Donec lobortis augue viverra ex ornare aliquam. Sed ornare euismod aliquam. Donec varius augue quis urna gravida tempus. Sed eu auctor mauris. Donec vel accumsan purus. Nam non tincidunt magna. Aenean vehicula, ex id dictum dapibus, nisl dui tempus turpis, ut maximus tortor ante at magna. Integer tincidunt, magna vel lacinia dapibus, felis leo ultrices metus, ac hendrerit ipsum ante quis eros. Donec condimentum mauris at euismod maximus. Donec ac nisl sagittis, rhoncus urna sit amet, blandit purus. Donec sed egestas lectus, in efficitur neque. Praesent ornare fringilla enim, ac mattis elit ultricies ac. Morbi gravida justo vel convallis euismod. Mauris viverra mauris in convallis ultricies. Suspendisse vehicula, risus non molestie commodo, tortor quam ultricies mi, id fermentum turpis orci sit amet eros. Pellentesque vel tempor metus. Fusce purus felis, maximus non lacus vitae, fringilla laoreet quam. Morbi fermentum finibus semper. Pellentesque pulvinar mollis facilisis.",
      price: "321",
      email: "ida.pettersen@gmail.com",
      name: "Ida Pettersen",
      phone: "97531357",
    },
  ];
  res.statusCode = 200;
  res.json(listings);
};
