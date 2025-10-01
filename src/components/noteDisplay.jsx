import MDEditor from "@uiw/react-md-editor";

function NoteDisplay({ data }) {
  const n = data;
  const updated = new Date(n.updatedAt).toLocaleString();

  return (
    <article data-color-mode="light" className="mt-10 mb-10">
      <h1 className="text-3xl font-bold my-4">{n.title}</h1>
      <p className="text-sm text-gray-500">Author: {n.createdBy}</p>
      <p className="text-sm text-gray-500 mb-8">Last updated: {updated}</p>
      <MDEditor.Markdown source={n.description} />
    </article>
  );
}

export default NoteDisplay;
