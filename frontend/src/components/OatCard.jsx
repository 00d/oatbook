import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import instance from "../lib/axios";
import toast from "react-hot-toast";

const OatCard = ({ oat, setOats }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault(); // stop Link behavior
    if (confirm("Are you sure you want to delete this oat?")) {
      try {
        await instance.delete(`oats/${id}`);
        toast.success("Oat deleted successfully!");
        setOats((prevOats) => prevOats.filter((oat) => oat._id !== id));
      } catch (error) {
        toast.error("Failed to delete oat.");
      }
    }
  };
  return (
  <Link to={`/oat/${oat._id}`} className="border rounded">
      <div className="card-body">
        <h3 className="card-title text-base-content">{oat.title}</h3>
        <p className="line-clamp-3">{oat.content}</p>
        <div className="card-actions justify-between items-center mt-3">
          <span className="text-sm text-base-content">
            {formatDate(oat.createdAt)}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button
              onClick={(e) => handleDelete(e, oat._id)}
              className="btn btn-ghost btn-xs text-error"
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OatCard;
