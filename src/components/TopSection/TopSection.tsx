import "./TopSection.scss";

import { TextBox } from "../TextBox/TextBox";

export type TopSectionProps = {
  title: string;
  value: string;
  errorMessage?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onValueChange: (text: string) => void;
};

export function TopSection(props: TopSectionProps) {
  return (
    <>
      <h1>{props.title}</h1>
      <form onSubmit={props.onSubmit}>
        <TextBox value={props.value} onChange={props.onValueChange} />
        {props.errorMessage && <p className="error">{props.errorMessage}</p>}
      </form>
    </>
  );
}
