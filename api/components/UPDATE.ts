import { commonAxios } from "./CommonAxios";
import { PUT } from "./ApiType";

type AxiosPatchProps = {
  endPoint: string;
  payload: any;
};

export const AxiosPatch = async (props: AxiosPatchProps) => {
  const { endPoint, payload } = props;
  try {
    const res = await commonAxios({
      url: endPoint,
      method: PUT,
      data: payload,
    });
    return res;
  } catch (err) {
    throw err;
  }
};
