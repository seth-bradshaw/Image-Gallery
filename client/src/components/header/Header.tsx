import FileUploader from "../gallery/upload/FileUploader";
import UserCard from "../user/UserCard";

type Props = {};

export default function Header({}: Props) {
  return (
    <header className="p-4 flex w-full bg-slate-100 shadow">
        <div className="w-full justify-self-start px-4 font-bold flex items-center">
          <h1 className="text-2xl text-purple-600">Splashify</h1>
        </div>
        <div className="w-full flex gap-4 justify-end">
          <FileUploader />
          <UserCard />
        </div>
    </header>
  );
}
