
// Objeto para pegar os preços e as fotos das camisetas

var camisetas = {
    'branca': {
        
        'gola_v': {
            'sem_estampa': {
                'preco_unit': 5.12,
                'foto': 'v-white.jpg' 
            },
            'com_estampa': {
                'preco_unit': 8.95,
                'foto': 'v-white-personalized.jpg' 
            }
        },
        
        'gola_normal': {
            'sem_estampa': {
                'preco_unit': 4.99,
                'foto': 'normal-white.jpg' 
            },
            'com_estampa': {
                'preco_unit': 8.77,
                'foto': 'normal-white-personalized.jpg' 
            }
        }
    },
    
    'colorida': {
        'gola_v': {
            'sem_estampa': {
                'preco_unit': 6.04,
                'foto': 'v-color.jpg' 
            },
            'com_estampa': {
                'preco_unit': 9.47,
                'foto': 'v-color-personalized.png' 
            }
        },
        
        'gola_normal': {
            'sem_estampa': {
                'preco_unit': 5.35,
                'foto': 'normal-color.jpg' 
            },
            'com_estampa': {
                'preco_unit': 9.28,
                'foto': 'normal-color-personalized.jpg' 
            }
        }
    }
}


// parâmetros da pesquisa

var parametros_pesquisa = {
    "quantidade": 10,
    "cor": "Colorida",
    "gola": "Gola V",
    "qualidade": "Normal (150g/m2)",
    "estampa": "Com estampa",
    "embalagem": "Bulk - sem Plástico"
}

	
//cria e inicia as variaveis usadas
var total = 0;
var preco_unidade = 0;
var cor = '';
var gola= '';
var qualidade= '';
var embalagem= '';
var estampado= '';
var qtd = 1

//aqui verificamos se um orcamento anterior foi salvo
//se sim carregamos os elementos da tela de acordo
//se nao: carregamos um conjunto de parametros padrão
if(localStorage.getItem("preco")){
	
		preco_unidade = localStorage.preco;
		cor = localStorage.cor;
		if(cor =='branca'){
			$("#branca").addClass("selected");
			$("#colorida").removeClass("selected");
		}else{
			$("#branca").removeClass("selected");
			$("#colorida").addClass("selected");
		}
		
		gola = localStorage.gola;
		if(gola == 'gola_v' || gola == $("#gola_v").text()){
			$("#gola_v").addClass("selected");
			$("#gola_normal").removeClass("selected");
		}else{
			$("#gola_v").removeClass("selected");
			$("#gola_normal").addClass("selected");
		}
		
		
		qualidade = localStorage.qualidade;
		if(qualidade == 'q150' || $("#q150").text()){
			$("#q150").addClass("selected");
			$("#q190").removeClass("selected");
		}else{
			$("#q150").removeClass("selected");
			$("#q190").addClass("selected");
		}
		
		embalagem = localStorage.embalagem;
		if(embalagem == 'bulk'){
			$("#embalagem").attr('selected',true);
			
		}else{
			$("#embalagem").attr('selected',true);
		}
		estampado = localStorage.estampa;
		
		if(estampado == 'com_estampa' || estampado == "Com estampa"){
			$("#estampa").attr('selected',true);
		
	}
	$("#quantidade").val(qtd = localStorage.quantidade);
	$("#foto-produto").attr("src",localStorage.foto_pesquisada);
	
	if(qtd<101){
		$("#desconto").css("visibility","visible");
		}
	
}else{

	preco_unidade = 9.28;
	cor = parametros_pesquisa.cor;
	gola = parametros_pesquisa.gola;
	qualidade = parametros_pesquisa.qualidade;
	embalagem = parametros_pesquisa.embalagem;
	estampado = parametros_pesquisa.estampa;
	qtd = parametros_pesquisa.quantidade;
	$("#foto-produto").attr("src","img/v-color-personalized.png");
	if(qtd<101){
		$("#desconto").css("visibility","hidden");
		}
	
	
	
	}
	
function verifica_quantidade(){
	if(qtd>100){
			$("#desconto").css("visibility","visible").css("fontWeight","bold");
			
		$("#desconto").text("O valor total com desconto aplicado é: R$ "+calcular_total_desconto(preco_unidade,qtd));
		}else{
			$("#desconto").css("visibility","hidden");
			//$("#preco_mil #valor-total_mil").text("Não é possivel efetuar descontos de acordo com essa quantidade");
		}
}


function definir_preco(){
		//caso a camisa seja colorida
		if(cor == "colorida" || cor == "Colorida"){
			if(gola == "gola_v" || gola == $("#gola_v").text()){
				if(estampado == "com_estampa" || estampado == "Com estampa"){
					preco_unidade = 9.47;
					
				$("#foto-produto").attr("src","img/v-color-personalized.png");
				}else{
				$("#foto-produto").attr("src","img/v-color.jpg");
					preco_unidade = 6.04;
				}
				//caso a gola seja normal
			}else{
				
				if(estampado == "com_estampa" || estampado == "Com estampa"){
					$("#foto-produto").attr("src","img/normal-color-personalized.jpg");
					
					preco_unidade = 9.28;
				}else{
					$("#foto-produto").attr("src","img/normal-color.jpg");
					preco_unidade = 5.35;
				}
			
			
				}
			//caso a camisa seja branca
		}else{
				//camisa com gola v
			if(gola == "gola_v" || gola == $("#gola_v").text()){
				if(estampado == "com_estampa"  || estampado == "Com estampa"){
					preco_unidade = 8.95;
					$("#foto-produto").attr("src","img/v-white-personalized.jpg");
					
				}else{
					preco_unidade = 5.12;
					$("#foto-produto").attr("src","img/v-white.jpg");
				}
				//camisa com gola normal
			}else{
				if(estampado == "com_estampa" || estampado == "Com estampa"){
					preco_unidade = 8.77;
					$("#foto-produto").attr("src","img/normal-white-personalized.jpg");
					
				}else{
					preco_unidade = 4.99;
					$("#foto-produto").attr("src","img/normal-white.jpg");
				}
			
			//embalagem = $("#estampa").find(":selected").text();
				}
			
		}
		if(qualidade == "q190" || qualidade == $("#q190").text()) preco_unidade += preco_unidade*0.12;
		if(embalagem == 'unitaria' || embalagem == "Unitária - Plástico"){
			
			return ((preco_unidade*qtd)+(0.15*qtd)).toFixed(2);
		}else{
			return (preco_unidade*qtd).toFixed(2);
		}
	
	}
function calcular_total_desconto(preco_unidade,quantidade){
	if(quantidade>100){
	
		return ((preco_unidade-(preco_unidade*0.5))*quantidade).toFixed(2);
	}else if(quantidade>=500){
		return ((preco_unidade-(preco_unidade*0.10))*quantidade).toFixed(2);
	}else if(quantidade>=1000){
		return ((preco_unidade-(preco_unidade*0.12))*quantidade).toFixed(2);
	}
	
	
}
$(function(){

    // ao carregar a pagina toda os results recebem os valores das variaves
	

	$("#result_quantidade").text(qtd);
	$("#result_embalagem").text(embalagem);
	$("#result_cor").text(cor);
	$("#result_qualidade").text(qualidade);
	$("#result_estampa").text(estampado);
	$("#result_gola").text(gola);
	total = definir_preco();
	$("#preco").text("R$ "+total);
	
	verifica_quantidade();

	$("#quantidade").change(function(){
		
		qtd = $(this).val();
		$("#result_quantidade").text(qtd);
		total = definir_preco();
		$("#preco").text("R$ "+total);
		
		verifica_quantidade();
		
	});
	//troca as selecoes entre as cores
	$("#colorida").click( function(){
		//se branca tem classe remove dela e adiciona na cor
	//	if($("#branca").hasClass("selected")){
			$(this).addClass("selected");
			$("#branca").removeClass("selected");
			
		//}
		cor = "Colorida";
		$("#result_cor").text(cor);
		$("#preco").text("R$ "+definir_preco());
		
	});
	$("#branca").click( function(){
		$(this).addClass("selected");
			$("#colorida").removeClass("selected");
		cor = $(this).text();
		$("#result_cor").text(cor);
		$("#preco").text("R$ "+definir_preco());
	});
	
	//troca as selecoes entre as golas
	$("#gola_v").click( function(){
		
			$(this).addClass("selected");
			$("#gola_normal").removeClass("selected");
			$("#result_gola").text($("#gola_v").text());
			//gola = $("#gola_v").attr("id");
			gola = $("#gola_v").text();
			$("#result_gola").text(gola);
			$("#preco").text("R$ "+definir_preco());
		
		
		
	});
	$("#gola_normal").click( function(){
		
			$(this).addClass("selected");
			$("#gola_v").removeClass("selected");
			$("#result_gola").text($("#gola_normal").text());
			gola = $("#gola_normal").text();
			$("#result_gola").text(gola);
			$("#preco").text("R$ "+definir_preco());
		
		
	});
	
	//troca as selecoes entre as qualidades
	$("#q150").click( function(){
		$(this).addClass("selected");
			$("#q190").removeClass("selected");
		
					//gola = 
		//qualidade = $("#result_qualidade").text();
		qualidade = $("#q150").text();
		$("#result_qualidade").text(qualidade);
		
		$("#preco").text("R$ "+definir_preco());
	});
	$("#q190").click( function(){
		$(this).addClass("selected");
		$("#q150").removeClass("selected");
		
		
		qualidade = $("#q190").text();
		$("#result_qualidade").text(qualidade);
		$("#preco").text("R$ "+definir_preco());
		
	});
	
	//paga o texto das estampas
	$("#estampa").change( function(){
		estampado = $("#estampa").find(":selected").text();
		$("#result_estampa").text(estampado);
		$("#preco").text("R$ "+definir_preco());
		
	});
	
	$("#result_estampa").change( function(){
		
		$("#result_estampa").text(estampado);
		$("#preco").text("R$ "+definir_preco());
	});
	
	
	$("#embalagem").change( function(){
		if($("#embalagem").val() == "unitaria"){
			embalagem = $("#embalagem").find(":selected").text();
		}else embalagem = $("#embalagem").find(":selected").text();
		$("#result_embalagem").text(embalagem);
		$("#preco").text("R$ "+definir_preco());
		
	});
	
	//	quando clica em comprar é mostrada um modal para exibir
	//uma mensagem de compra e depois de 2 segundos força um evento click pra fechar
	
	$("#comprar").click(function(){
		localStorage.setItem("embalagem",$("#result_embalagem").text());
		localStorage.setItem("estampa",$("#result_estampa").text());
		localStorage.setItem("qualidade",$("#result_qualidade").text());
		localStorage.setItem("cor",$("#result_cor").text());
		localStorage.setItem("gola",$("#result_gola").text());
		localStorage.setItem("quantidade",$("#result_quantidade").text());
		localStorage.setItem("preco",preco_unidade);
		localStorage.setItem("foto_pesquisada",$("#foto-produto").attr("src"));
		
		//força o fechamento
		setTimeout(function(){
		console.log("werthj");
		$('a.close-reveal-modal').click();
	},1800);
	});
	$('a.close-reveal-modal')
	
	

	
    
});
    // 5. Crie a funcionalidade do localStorage e ao carregar a página, consulte o localStorage, 
    // atualize a variável "parametros_pesquisa" e rode a função de cálculo de preço