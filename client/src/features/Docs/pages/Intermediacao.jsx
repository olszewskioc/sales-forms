import {useState} from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const Intermediacao = () => {
    const [page, setPage] = useState(1);
    const [formData, setFormData] = useState({
        captador: {
            matricula: "",
            cartorio: "",
            captador: "",
            habite_se: false,
            averbada: false
        },
        imovel: {
            tipo_imovel: "",
            situacao: "",
            inquilino_alugado: "",
            data_desocupacao: Date.now(),
            endereco: "",
            complemento: "",
            bairro: "",
            cidade: "",
            cep: "",
            pomto_ref: "",
            idade_imovel: 0,
            chaves: 0
        },
        areas: {
            garagem: 0,
            lavabo: 0,
            sala_estar: 0,
            sala_tv: 0,
            escritorio: 0,
            suite: 0,
            sw_servico: 0,
            wc_social: 0,
            dep_empregada: 0,
            edicula: 0,
            piscina: 0,
            churrasqueira: 0,
            energia_solar: 0,
            aquecedor: 0,
            portao_eletronico: 0,
            cerca_eletrica: 0,
            cozinha: 0,
            copa: 0,
            suite_closet: 0,
            quarto: 0,
            area_servico: 0,
            alarme: 0,
            salao_festa: 0,
            quadra: 0,
            obs_imovel: 0
        },
        condicoes: {
            valor_venda: 0,
            valor_cond: 0,
            financiamento: true,
            saldo_dev: 0,
            metragem: 0,
            area_tota: 0,
            area_construida: 0,
            pagamento: "",
            iptu: 0,
            placa: true,
            obs_geral: "",
            exclusivo: false,
        },
        contratante: {
            nome_proprietario: "",
            email_proprietario: "",
            cpf_proprietario: "",
            tel_proprietario: "",
            vigencia: 0,
        }
    });

    const captadorValidationSchema = Yup.object({
        matricula: Yup.string()
            .min(4, "Matrícula tem no mínimo 4 números")
            .required("Matrícula é obrigatória"),
        cartorio: Yup.string()
            .min(3, "Cartório precisa de no mínimo 3 caracteres")
            .required("Cartório é obrigatório"),
        captador: Yup.string()
            .min(2, "Nome captador precisa de no mínimo 2 caracteres")
            .required("Captador é obrigatório"),
        habite_se: Yup.boolean().required(
            "Obrigatório informar se possui o habite-se"
        ),
        averbada: Yup.boolean().required(
            "Obrigatório informar se a área está averbada"
        ),
    });

    const imovelValidationSchema = Yup.object({
        tipo_imovel: Yup.string().required(
            "Obrigatório informar o tipo do imóvel"
        ),
        situacao: Yup.string().required(
            "Obrigatório informar a situação do imóvel"
        ),
        inquilino_alugado: Yup.string().when("situacao", {
            is: "OCUPADO",
            then: (schema) =>
                schema.required("Obrigatório informar o inquilino"),
            otherwise: (schema) => schema.notRequired(),
        }),
        data_desocupacao: Yup.date().when("situacao", {
            is: "OCUPADO",
            then: (schema) =>
                schema.required("Obrigatório informar a data de desocupação"),
            otherwise: (schema) => schema.notRequired(),
        }),
        endereco: Yup.string()
            .required("Obrigatório informar o endereço do imóvel")
            .min(4, "Endereço muito curto"),
        complemento: Yup.string().notRequired(),
        bairro: Yup.string().required(
            "Obrigatório informar o bairro do imóvel"
        ),
        cidade: Yup.string().required(
            "Obrigatório informar a cidade do imóvel"
        ),
        cep: Yup.string()
            .required("Obrigatório informar o CEP do imóvel")
            .min(9, "CEP muito curto")
            .max(9, "CEP muito longo"),
        ponto_ref: Yup.string()
            .required("Obrigatório informar um ponto de referência")
            .min(3, "Ponto de referência muito curto"),
        idade_imovel: Yup.number().required(
            "Obrigatório informar a idade do imóvel"
        ),
        chaves: Yup.number().required(
            "Obrigat´roio informar a quantidade de chaves disponíveis para o imóvel"
        ),
    });

    const areasValidationSchema = Yup.object({
        garagem: Yup.number().required(
            "Obrigatório informar a quantidade de vagas de garagem"
        ),
        lavabo: Yup.number().required(
            "Obrigatório informar a quantidade de lavabos"
        ),
        sala_estar: Yup.number().required(
            "Obrigatório informar a quantidade de salas de estar/jantar"
        ),
        sala_tv: Yup.number().required(
            "Obrigatório informar a quantidade de salas de TV"
        ),
        escritorio: Yup.number().required(
            "Obrigatório informar a quantidade de escritórios"
        ),
        suite: Yup.number().required(
            "Obrigatório informar a quantidade de suítes"
        ),
        wc_servico: Yup.number().required(
            "Obrigatório informar a quantidade de banheiros de serviço"
        ),
        wc_social: Yup.number().required(
            "Obrigatório informar a quantidade de banheiros sociais"
        ),
        dep_empregada: Yup.number().required(
            "Obrigatório informar a quantidade de dep. de empregada"
        ),
        edicula: Yup.number().required(
            "Obrigatório informar a quantidade de edículas"
        ),
        piscina: Yup.number().required(
            "Obrigatório informar a quantidade de piscinas"
        ),
        churrasqueira: Yup.number().required(
            "Obrigatório informar a quantidade de churrasqueiras"
        ),
        energia_solar: Yup.number().required(
            "Obrigatório informar a quantidade de sistemas de energia solar"
        ),
        aquecedor: Yup.number().required(
            "Obrigatório informar a quantidade de aquecedores"
        ),
        portao_eletronico: Yup.number().required(
            "Obrigatório informar a quantidade de portões eletrônicos"
        ),
        cerca_eletrica: Yup.number().required(
            "Obrigatório informar a quantidade de cercas elétricas"
        ),
        cozinha: Yup.number().required(
            "Obrigatório informar a quantidade de cozinhas"
        ),
        copa: Yup.number().required(
            "Obrigatório informar a quantidade de copas"
        ),
        suite_closet: Yup.number().required(
            "Obrigatório informar a quantidade de suítes com closet"
        ),
        quarto: Yup.number().required(
            "Obrigatório informar a quantidade de quartos"
        ),
        area_servico: Yup.number().required(
            "Obrigatório informar a área de serviço"
        ),
        alarme: Yup.number().required(
            "Obrigatório informar a quantidade de alarmes/câmeras"
        ),
        salao_festa: Yup.number().required(
            "Obrigatório informar a quantidade de salões de festa"
        ),
        quadra: Yup.number().required(
            "Obrigatório informar a quantidade de quadras esportivas"
        ),
        obs_imovel: Yup.string().required(
            "Obrigatório informar a observação do imóvel"
        ),
    });

    const condicoesValidationSchema = Yup.object({
        valor_venda: Yup.number().required(
            "Obrigatório informar o valor de venda do imóvel"
        ),
        valor_cond: Yup.number().required(
            "Obrigatório informar o valor de condição do imóvel"
        ),
        financiamento: Yup.boolean().required(
            "Obrigatório informar se aceita financiamento"
        ),
        saldo_dev: Yup.number().required(
            "Obrigatório informar o saldo devedor do imóvel"
        ),
        metragem: Yup.number().required(
            "Obrigatório informar a metragem do imóvel"
        ),
        area_total: Yup.number().required(
            "Obrigatório informar a área total do imóvel"
        ),
        area_construida: Yup.number().required(
            "Obrigatório informar a área construída do imóvel"
        ),
        pagamento: Yup.string().required(
            "Obrigatório informar o tipo de pagamento do imóvel"
        ),
        iptu: Yup.number().required(
            "Obrigatório informar o valor do IPTU do imóvel"
        ),
        placa: Yup.boolean().required(
            "Obrigatório informar se foi colocado placa"
        ),
        obs_geral: Yup.string().required(
            "Obrigatório informar a observação geral do imóvel"
        ),
        exclusivo: Yup.boolean().required("Obrigatório informar se é exclusivo"),
    });

    const contratanteValidationSchema = Yup.object({
        nome_proprietario: Yup.string().required(
            "Obrigatório informar o nome do proprietário"
        ),
        email_proprietario: Yup.string()
            .email()
            .required("Obrigatório informar o e-mail do proprietário"),
        cpf_proprietario: Yup.string().required(
            "Obrigatório informar o CPF do proprietário"
        ),
        tel_proprietario: Yup.string().required(
            "Obrigatório informar o telefone do proprietário"
        ),
        vigencia: Yup.number().required(
            "Obrigatório informar a vigência da opção de venda"
        ),
    });

    return <div>Intermediacao</div>;
};

export default Intermediacao;
