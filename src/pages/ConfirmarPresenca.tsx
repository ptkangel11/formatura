
import React from 'react';
import Navigation from '../components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const ConfirmarPresenca = () => {
  return (
    <div className="min-h-screen bg-black font-inter relative">
      {/* Background with same image but darker overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: 'url("/lovable-uploads/75838767-2b1b-4c4a-a8d4-3686ad0af0cb.png")',
          backgroundPosition: 'left center'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>
      </div>

      <Navigation />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center py-20">
        <div className="container mx-auto px-8">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-light text-white mb-4 tracking-wider">
                CONFIRMAÇÃO DE PRESENÇA
              </h1>
              <p className="text-xl text-gray-300 tracking-widest">
                FORMATURA DR. PABLO BERINI LEMGRUBER
              </p>
            </div>

            {/* Form Card */}
            <Card className="bg-black bg-opacity-60 border-gray-600 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-center text-2xl font-light tracking-wider">
                  Confirme sua Presença
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Form space ready for implementation */}
                <div className="text-center text-gray-300 py-12">
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-8">
                    <p className="text-lg mb-4">Formulário será implementado aqui</p>
                    <p className="text-sm text-gray-400">
                      Este espaço está preparado para receber:
                    </p>
                    <ul className="text-sm text-gray-400 mt-2 space-y-1">
                      <li>• Nome completo</li>
                      <li>• Email</li>
                      <li>• Telefone</li>
                      <li>• Número de acompanhantes</li>
                      <li>• Observações especiais</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmarPresenca;
