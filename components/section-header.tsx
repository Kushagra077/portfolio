interface SectionHeaderProps {
  title: string;
  description: string;
}

export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-foreground sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
        {title}
      </h1>
      <p className="text-lg leading-7 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}