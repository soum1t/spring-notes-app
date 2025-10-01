import { Link } from "@tanstack/react-router";
import { PencilIcon } from "lucide-react";

function Note({ data }) {
  const n = data;
  const updated = new Date(n.updatedAt).toLocaleDateString();

  return (
    <article className="rounded-lg border border-gray-200 bg-white p-4 shadow-xs transition hover:shadow-sm sm:p-6">
      <a>
        <h3 className="mt-0.5 text-lg font-medium text-gray-900">
          {data.title.length < 20
            ? data.title
            : data.title.substring(0, 20) + "..."}
        </h3>
      </a>
      <p className="text-xs/relaxed text-gray-500">{updated}</p>

      <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
        {data.description}
      </p>
      <div className="flex justify-between items-center">
        <Link
          to={`/${data.id}`}
          className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600"
        >
          Find out more
          <span
            aria-hidden="true"
            className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
          >
            &rarr;
          </span>
        </Link>
        <Link
          to={`/edit/${data.id}`}
          className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600"
        >
          Edit
          <PencilIcon size={12} />
        </Link>
      </div>
    </article>
  );
}

export default Note;
