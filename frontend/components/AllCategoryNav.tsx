"use client";

const allNavSections = [
  {
    title: "Trending",
    links: ["Bestsellers", "New Releases", "Movers and Shakers"]
  },
  {
    title: "Digital Content and Devices",
    links: ["Echo & Alexa", "Fire TV", "Kindle E-Readers & eBooks", "Audible Audiobooks", "Amazon Prime Video", "Amazon Prime Music"]
  },
  {
    title: "Shop by Category",
    links: [
      "Mobiles, Computers",
      "TV, Appliances, Electronics",
      "Men's Fashion",
      "Women's Fashion",
      "See all"
    ]
  },
  {
    title: "Programs & Features",
    links: [
      "Amazon Pay",
      "Gift Cards & Mobile Recharges",
      "Amazon Launchpad",
      "Amazon Business",
      "See all"
    ]
  },
  {
    title: "Help & Settings",
    links: [
      "Your Account",
      "Customer Service",
      "Sign in"
    ]
  }
];

export default function AllCategoryNav() {
  return (
    <aside className="w-full md:w-64 bg-white rounded shadow p-4 mb-6">
      {allNavSections.map(section => (
        <div key={section.title} className="mb-4">
          <div className="font-bold text-amazon-blue mb-2 text-sm uppercase tracking-wide">{section.title}</div>
          <ul className="space-y-1">
            {section.links.map(link => (
              <li key={link}>
                <a href="#" className="text-gray-700 hover:text-amazon-blue text-sm">{link}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
} 