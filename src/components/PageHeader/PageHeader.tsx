const PageHeader = ({ title }: { title: string }) => (
  <header className="pt-4 pb-12 text-center">
    <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{title}</h1>
    <span className="mx-auto mt-4 block h-1 w-16 rounded-full bg-[#3fb63f]" />
  </header>
);

export default PageHeader;
