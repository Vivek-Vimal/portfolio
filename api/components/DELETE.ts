import { commonAxios } from "./CommonAxios";
import { DELETE } from "./ApiType";

type AxiosDeleteProps = {
  endPoint: string;
  payload?: any;
};

export const AxiosDelete = async (props: AxiosDeleteProps) => {
  const { endPoint, payload = {} } = props;
  try {
    const res = await commonAxios({
      method: DELETE,
      url: endPoint,
      data: payload,
    });
    return res;
  } catch (err) {
    throw err;
  }
};
