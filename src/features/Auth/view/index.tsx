import { ButtonComponent } from "@/shared/components/ButtonComponent";
import { InputComponent } from "@/shared/components/InputComponent";
import { IoLogIn } from "react-icons/io5";

interface AuthComponentProps {
  headerTitle: string;

  // inputs

  //user
  labelNameUser: string;
  placeholderNameUser?: string;
  valueNameUser?: string;
  onChangeNameUser?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  //password
  labelPassword: string;
  placeholderPassword?: string;
  valuePassword?: string;
  onChangePassword?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  //confirm password
  labelConfirmPassword?: string;
  placeholderConfirmPassword?: string;
  valueConfirmPassword?: string;
  onChangeConfirmPassword?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  // button
  textButton?: string;
  iconButton?: React.ReactNode;
  iconLeftButton?: React.ReactNode;
  iconRightButton?: React.ReactNode;
  onClickButton?: () => void;
  classNameButton?: string;
  disabledButton?: boolean;
  typeButton?: "button" | "submit" | "reset";
  loadingButton?: boolean;
  loaderIconButton?: React.ReactNode;

  //footer
  footerText?: string;
  footerLink?: string;
  footerLinkText?: string;
}

export function AuthComponent({
  headerTitle,
  labelNameUser,
  placeholderNameUser,
  valueNameUser,
  onChangeNameUser,
  labelPassword,
  placeholderPassword,
  valuePassword,
  onChangePassword,
  labelConfirmPassword,
  placeholderConfirmPassword,
  valueConfirmPassword,
  onChangeConfirmPassword,
  textButton,
  onClickButton,
  disabledButton,
  loadingButton,
  loaderIconButton,
  footerLink,
  footerLinkText,
  footerText,
}: AuthComponentProps) {
  return (
    <div className="w-full h-screen bg-gray-50">
      <div className="fixed top-1/2 left-1/2 transform flex flex-col gap-12 -translate-x-1/2 -translate-y-1/2">
        <header className="flex justify-center items-center flex-col gap-2">
          <img src={"/logo-vmdocs.png"} height={150} width={150} />
          <h1 className="text-3xl font-bold text-slate-800">{headerTitle}</h1>
        </header>

        <div className="flex justify-center items-center flex-col gap-6">
          <div className="flex flex-col gap-4">
            <InputComponent
              label={labelNameUser}
              value={valueNameUser}
              onChange={onChangeNameUser}
              classNameLabel="text-slate-800 text-sm"
              placeholder={placeholderNameUser}
              className="bg-transparent p-2 text-slate-900 text-sm w-md"
            />
            <InputComponent
              label={labelPassword}
              value={valuePassword}
              onChange={onChangePassword}
              classNameLabel="text-slate-800 text-sm"
              placeholder={placeholderPassword}
              type="password"
              className="bg-transparent p-2 text-slate-900 text-sm w-md"
            />

            {labelConfirmPassword && (
              <InputComponent
                label={labelConfirmPassword || "Confirme sua senha"}
                value={valueConfirmPassword}
                onChange={onChangeConfirmPassword}
                classNameLabel="text-slate-800 text-sm"
                placeholder={placeholderConfirmPassword}
                type="password"
                className="bg-transparent p-2 text-slate-900 text-sm w-md"
              />
            )}
          </div>

          <ButtonComponent
            text={textButton}
            iconRight={<IoLogIn size={20} />}
            onClick={onClickButton}
            disabled={disabledButton}
            loading={loadingButton}
            loaderIcon={loaderIconButton}
            className="w-full text-base font-semibold text-gray-100 rounded-full bg-indigo-600"
          />
          <p className="text-sm font-bold text-slate-800">
            {footerText}{" "}
            <a href={footerLink} className="text-indigo-500 cursor-pointer">
              {footerLinkText}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
