import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import instance from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon } from "lucide-react";


// TODO


const OatDetailPage = () => {
  const [oat, setOat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchOat = async () => {
      setLoading(true);
      try {
        const response = await instance.get(`/oats/${id}`);
        setOat(response.data);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          console.error("Rate limit exceeded");
        } else {
          toast.error("Error fetching oat");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOat();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  if (!oat) {
    return <div>No oat found</div>;
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="btn btn-ghost">
            <ArrowLeftIcon className="size-5" />
            Back to Oats
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OatDetailPage;
