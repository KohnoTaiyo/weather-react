import "./TextBox.scss";

type TextBoxProps = {
  value: string;
  onChange: (text: string) => void;
};

export function TextBox(props: TextBoxProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => props.onChange(e.target.value);

  return (
    <div className="textBox">
      <input
        type="text"
        className="textBox__input"
        placeholder="location"
        value={props.value}
        onChange={handleChange}
        required
      />
      <input type="submit" value="Search" className="textBox__submit" />
    </div>
  );
}
