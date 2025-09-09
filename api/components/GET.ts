import { commonAxios } from "./CommonAxios";
import { GET } from "./ApiType";

type AxiosGetProps = {
  endPoint: string;
  toCheck?: boolean;
  isImage?: boolean;
};

export const AxiosGet = async (props: AxiosGetProps) => {
  const { endPoint } = props;
  try {
    const res = await commonAxios({
      method: GET,
      url: endPoint,
    });
    return res;
  } catch (err) {
    throw err;
  }
};
