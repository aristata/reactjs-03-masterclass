interface MaterialIconProps {
  name: string;
  Tag?: keyof JSX.IntrinsicElements;
}

const MaterialIcon = ({ name, Tag = "div" }: MaterialIconProps) => {
  return (
    <Tag
      className="material-icons-round"
      style={{ fontSize: "inherit", userSelect: "none" }}
    >
      {name}
    </Tag>
  );
};

export default MaterialIcon;
