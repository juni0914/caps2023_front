import axios from "axios";

export const fetchReservations = async (token) => {
  try {
    const response = await axios({
      url: "http://localhost:8080/center/reservations",
      method: "GET",
      withCredentials: true,
      headers: {
        'Authorization': token
      }
    });

    if (response.data && response.data.content) {
      console.log(response.data);
      const reserveNames = response.data.content.map((item) => item.name);
      const ReserveIds = response.data.content.map((item) => item.reservationId);
      const CenterIds = response.data.content.map((item) => item.centerId);
      return {
        reserveData: reserveNames,
        reserveId: ReserveIds,
        reservecenterId: CenterIds
      };
    }

    // return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
