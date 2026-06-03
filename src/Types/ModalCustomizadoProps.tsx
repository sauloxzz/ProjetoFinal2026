export interface ModalCustomizadoProps {
    mostrarModalQuando: Boolean;
    aoCancelar: () => void;
    titulo: String;
    corpo: string | React.ReactNode;
    textoBotaoConfirmacao?: string;
    textoBotaoCancelamento?: string;
    aoConfirmar?: () => void;
    customizarBotoes?: Boolean;
    exibirConteudoCentralizado?: Boolean; 
}