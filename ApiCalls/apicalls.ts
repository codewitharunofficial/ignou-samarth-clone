import axios from "axios";

export const fetchCampuses = async () => {
  try {
    const { data } = await axios.get("/api/campuses");
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching campuses:", error);
    throw error;
  }
};

export const fetchTypes = async (campusName: string) => {
  try {
    const { data } = await axios.get(`/api/types?campus=${campusName}`);
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching types:", error);
    throw error;
  }
};

export const fetchFilteredFlats = async (filters: any) => {
  try {
    const { data } = await axios.get("/api/flats", { params: filters });
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching filtered flats:", error);
    throw error;
  }
};
