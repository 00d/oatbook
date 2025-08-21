import { ArrowLeftIcon } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import instance from "../lib/axios.js"; // Assuming you have an axios instance set up

const CreatePage = () => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required.");
      return;
    }
    setLoading(true);
    try {
      await instance.post("oats", { title, content });
      toast.success("Oat created successfully!");
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 429) {
        toast.error("Rate limit exceeded");
      } else {
        toast.error("Failed to create oat");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to="/" className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" /> Go Back
          </Link>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create a New Oat</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label mr-2">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your oat title"
                    className="input input-bordered"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-control mb-4">
                  <label className="label mr-2">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    placeholder="Enter your oat content"
                    className="textarea textarea-bordered h-32"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Oat"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
