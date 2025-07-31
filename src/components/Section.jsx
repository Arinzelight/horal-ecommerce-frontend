export const Section = ({ title, children }) => (
  <div className="flex flex-col gap-2">
    <h2 className="text-primary text-lg font-bold ">{title}</h2>
    <div className="text-neutral-900 text-sm font-normal  text-justify">
      {children}
    </div>
  </div>
);

export const Header = ({ title }) => (
  <div className="w-full h-12 p-2.5 bg-sky-950 rounded flex justify-between items-center">
    <h1 className="text-white text-xl font-bold ">{title}</h1>
  </div>
);
