interface Props {
  children: React.ReactNode;
  marginTop?: number;
  marginBottom?: number;
}

function SectionHeading({ children, marginTop, marginBottom }: Props) {
  return (
    <h1
      className="md:text-8xl font-bold md:mx-8 mx-4"
      style={{
        fontSize: "min(15vw, 175px)",
        marginTop,
        marginBottom,
      }}
    >
      {children}
    </h1>
  );
}

export default SectionHeading;
