import { commonAxios } from "./CommonAxios";
import { POST } from "./ApiType";

type AxiosPostProps = {
  endPoint: string;
  payload: any;
};

export const AxiosPost = async (props: AxiosPostProps) => {
  const { endPoint, payload } = props;
  try {
    const res = await commonAxios({
      url: endPoint,
      method: POST,
      data: payload,
    });
    return res;
  } catch (err) {
    throw err;
  }
};
