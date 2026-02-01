import React, { useState, useEffect } from 'react';
import { AlertTriangle, Anchor, Camera, Umbrella, Sun, Clock, CloudSun, Volume2, CloudRain, CloudSnow, ArrowRight, Sunset, Sunrise, Droplets, X } from 'lucide-react';
import { Coordinate } from '../types';
import { PRONUNCIATIONS, UPDATE_DATE } from '../constants';

interface GuideProps {
    userLocation: Coordinate | null;
}

export const Guide: React.FC<GuideProps> = ({ userLocation }) => {
    const [playing, setPlaying] = useState<string | null>(null);
    const [forecast, setForecast] = useState<any[]>([]);
    const [hourlyForecast, setHourlyForecast] = useState<any[]>([]);
    const [astronomy, setAstronomy] = useState<any>(null);
    const [showRainGuide, setShowRainGuide] = useState(false);

    // Fetch Weather & Solar Data
    useEffect(() => {
        // Weather for Hellesylt/Geiranger (Lat 62.08)
        fetch('https://api.open-meteo.com/v1/forecast?latitude=62.08&longitude=6.86&current=temperature_2m,weather_code,is_day&hourly=temperature_2m,precipitation_probability,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Europe%2FBerlin&forecast_days=5')
            .then(res => res.json())
            .then(data => {
                // Process Hourly (09:00 - 20:00 for today)
                if (data.hourly) {
                    const hourly = [];
                    // Loop through first 24 indices (Today)
                    for(let i = 0; i < 24; i++) {
                        const timeStr = data.hourly.time[i]; 
                        const hourStr = timeStr.split('T')[1].split(':')[0];
                        const hour = parseInt(hourStr, 10);
                        
                        if (hour >= 9 && hour <= 20) {
                            hourly.push({
                                time: `${hourStr}:00`,
                                temp: Math.round(data.hourly.temperature_2m[i]),
                                precip: data.hourly.precipitation_probability[i],
                                code: data.hourly.weather_code[i]
                            });
                        }
                    }
                    setHourlyForecast(hourly);
                }

                // Process 5-day forecast
                if(data.daily) {
                    const days = data.daily.time.map((t: string, i: number) => ({
                        date: t,
                        max: data.daily.temperature_2m_max[i],
                        min: data.daily.temperature_2m_min[i],
                        code: data.daily.weather_code[i]
                    }));
                    setForecast(days);
                }
            })
            .catch(e => console.log('Weather offline'));

        // Solar/Astronomy
        fetch('https://api.open-meteo.com/v1/forecast?latitude=62.08&longitude=6.86&daily=sunrise,sunset,daylight_duration&timezone=Europe%2FBerlin&forecast_days=1')
            .then(res => res.json())
            .then(data => {
                if (data.daily) {
                    setAstronomy({
                        sunrise: data.daily.sunrise[0], // ISO String
                        sunset: data.daily.sunset[0],   // ISO String
                        duration: (data.daily.daylight_duration[0] / 3600).toFixed(1)
                    });
                }
            })
            .catch(e => console.log("Astronomy offline"));
    }, []);

    const playAudio = (text: string) => {
        if ('speechSynthesis' in window) {
            setPlaying(text);
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'no-NO'; // Norwegian
            utterance.rate = 0.9;
            utterance.onend = () => setPlaying(null);
            window.speechSynthesis.speak(utterance);
        } else {
            alert("Tu navegador no soporta audio.");
        }
    };

    const getWeatherIcon = (code: number) => {
        if (code <= 3) return <Sun className="text-yellow-500" />;
        if (code <= 60) return <CloudRain className="text-blue-400" />;
        return <CloudSnow className="text-gray-400" />;
    };

    const handleSOS = () => {
        if (!userLocation) {
            alert("Necesitamos tu ubicación primero. Asegúrate de tener el GPS activo.");
            return;
        }
        const text = `🆘 SOS! Necesito ayuda. Mi ubicación actual en Hellesylt/Geiranger es: https://maps.google.com/?q=${userLocation.lat},${userLocation.lng}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    };

    const openTranslator = () => {
        window.open('https://translate.google.com/?sl=no&tl=es&op=images', '_blank');
    };
    
    const openMSCApp = () => {
        window.open('https://play.google.com/store/apps/details?id=com.msccruises.mscforme', '_blank');
    };

    // Solar Chart Helper
    const renderSolarChart = () => {
        if (!astronomy) return <div className="text-xs text-slate-400">Cargando datos solares...</div>;

        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();
        const totalMinutes = 24 * 60;
        const nowPercent = (currentMinutes / totalMinutes) * 100;

        const sunriseDate = new Date(astronomy.sunrise);
        const sunsetDate = new Date(astronomy.sunset);
        
        const sunriseMins = sunriseDate.getHours() * 60 + sunriseDate.getMinutes();
        const sunsetMins = sunsetDate.getHours() * 60 + sunsetDate.getMinutes();
        
        const sunrisePercent = (sunriseMins / totalMinutes) * 100;
        const sunsetPercent = (sunsetMins / totalMinutes) * 100;

        const sunriseStr = `${String(sunriseDate.getHours()).padStart(2,'0')}:${String(sunriseDate.getMinutes()).padStart(2,'0')}`;
        const sunsetStr = `${String(sunsetDate.getHours()).padStart(2,'0')}:${String(sunsetDate.getMinutes()).padStart(2,'0')}`;

        return (
            <div className="mt-4 bg-slate-900 rounded-xl p-4 text-white relative overflow-hidden shadow-inner">
                <div className="flex justify-between text-xs text-slate-400 mb-6 font-mono">
                    <span>00:00</span>
                    <span>12:00</span>
                    <span>23:59</span>
                </div>
                
                {/* The Bar Container */}
                <div className="relative h-12 w-full rounded-full bg-slate-800 overflow-hidden border border-slate-700">
                    {/* Day Segment (Blue) */}
                    <div 
                        className="absolute top-0 bottom-0 bg-sky-400"
                        style={{ 
                            left: `${sunrisePercent}%`, 
                            width: `${sunsetPercent - sunrisePercent}%` 
                        }}
                    ></div>

                    {/* Sunrise Gradient Overlay */}
                    <div 
                        className="absolute top-0 bottom-0 w-8 -ml-4 bg-gradient-to-r from-slate-800 via-orange-400 to-sky-400 opacity-90"
                        style={{ left: `${sunrisePercent}%` }}
                    ></div>

                    {/* Sunset Gradient Overlay */}
                    <div 
                        className="absolute top-0 bottom-0 w-8 -ml-4 bg-gradient-to-r from-sky-400 via-orange-500 to-slate-800 opacity-90"
                        style={{ left: `${sunsetPercent}%` }}
                    ></div>
                    
                    {/* NOW Indicator */}
                    <div 
                        className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10 shadow-[0_0_10px_rgba(239,68,68,0.8)]"
                        style={{ left: `${nowPercent}%` }}
                    >
                        <div className="absolute -top-1 -left-[3px] w-2 h-2 bg-red-500 rounded-full"></div>
                        <div className="absolute top-1/2 -left-6 bg-red-600 text-white text-[9px] font-bold px-1 rounded transform -translate-y-1/2">AHORA</div>
                    </div>
                </div>

                {/* Labels positioned absolutely */}
                <div className="relative h-6 mt-1 w-full text-[10px] font-bold">
                    <div 
                        className="absolute transform -translate-x-1/2 flex flex-col items-center text-yellow-400"
                        style={{ left: `${sunrisePercent}%` }}
                    >
                        <ArrowRight size={10} className="-rotate-90 mb-0.5"/>
                        <span>{sunriseStr}</span>
                    </div>
                    <div 
                        className="absolute transform -translate-x-1/2 flex flex-col items-center text-orange-400"
                        style={{ left: `${sunsetPercent}%` }}
                    >
                        <ArrowRight size={10} className="-rotate-90 mb-0.5"/>
                        <span>{sunsetStr}</span>
                    </div>
                </div>
                
                <div className="mt-4 flex items-center justify-between text-xs text-slate-300 bg-white/5 p-2 rounded">
                    <div className="flex items-center"><Sunrise size={14} className="text-yellow-400 mr-2"/> Amanecer</div>
                    <div className="font-mono">{astronomy.duration}h Luz</div>
                    <div className="flex items-center">Atardecer <Sunset size={14} className="text-orange-500 ml-2"/></div>
                </div>
            </div>
        );
    };

    return (
        <div className="pb-24 px-4 pt-6 max-w-lg mx-auto h-full overflow-y-auto">
            
            {/* SOS & Apps Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-4">
                <button 
                    onClick={handleSOS}
                    className="bg-red-600 text-white p-4 rounded-xl shadow-lg flex flex-col items-center justify-center active:scale-95 transition-transform animate-pulse-slow"
                >
                    <AlertTriangle size={32} className="mb-2" />
                    <span className="font-bold text-sm">SOS EMERGENCIA</span>
                    <span className="text-[10px] opacity-80 mt-1">Enviar Ubicación</span>
                </button>
                
                <div className="flex flex-col gap-2">
                        <button 
                        onClick={openMSCApp}
                        className="flex-1 bg-blue-900 text-white p-2 rounded-xl shadow flex items-center justify-center active:scale-95"
                    >
                        <Anchor size={20} className="mr-2" />
                        <span className="text-xs font-bold">App MSC</span>
                    </button>
                    <button 
                        onClick={openTranslator}
                        className="flex-1 bg-indigo-600 text-white p-2 rounded-xl shadow flex items-center justify-center active:scale-95"
                    >
                        <Camera size={20} className="mr-2" />
                        <span className="text-xs font-bold">Traductor Visual</span>
                    </button>
                </div>
            </div>

            {/* Rain Guide Button */}
            <button 
                onClick={() => setShowRainGuide(true)}
                className="w-full bg-slate-800 text-white p-3 rounded-xl shadow-md mb-6 flex items-center justify-center space-x-2 active:scale-95 transition-all border border-slate-700"
            >
                <Umbrella size={20} className="text-blue-300" />
                <span className="font-bold">INCLEMENCIA CLIMÁTICA: Plan de Lluvia</span>
            </button>

            <h2 className="text-2xl font-bold text-fjord-500 mb-4">Guía Local</h2>

            {/* Solar Chart */}
            <div className="mb-8">
                <h3 className="font-bold text-slate-700 mb-2 flex items-center"><Sun size={18} className="mr-2 text-orange-500"/> Ciclo Solar Hoy</h3>
                {renderSolarChart()}
            </div>

            {/* Hourly Weather Forecast (09:00 - 20:00) */}
            {hourlyForecast.length > 0 && (
                <div className="mb-8">
                        <h3 className="font-bold text-slate-700 mb-4 flex items-center"><Clock size={18} className="mr-2 text-blue-500"/> Clima por Horas (09:00 - 20:00)</h3>
                        <div className="flex overflow-x-auto pb-4 space-x-3 snap-x">
                        {hourlyForecast.map((hour, idx) => (
                            <div key={idx} className="flex-none w-20 bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center justify-center snap-center">
                                <span className="text-xs font-bold text-slate-400 mb-2">{hour.time}</span>
                                <div className="mb-2 scale-125">{getWeatherIcon(hour.code)}</div>
                                <span className="text-lg font-bold text-slate-800">{hour.temp}°</span>
                                <div className="flex items-center text-[10px] text-blue-500 font-medium mt-1">
                                    <Droplets size={8} className="mr-1"/> {hour.precip}%
                                </div>
                            </div>
                        ))}
                        </div>
                </div>
            )}

            {/* 5-Day Forecast */}
            <div className="mb-8">
                    <h3 className="font-bold text-slate-700 mb-4 flex items-center"><CloudSun size={18} className="mr-2 text-blue-500"/> Pronóstico 5 Días</h3>
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 divide-y divide-slate-100">
                    {forecast.length > 0 ? forecast.map((day, i) => {
                        const date = new Date(day.date);
                        const dayName = date.toLocaleDateString('es-ES', { weekday: 'long' });
                        return (
                            <div key={day.date} className="p-3 flex justify-between items-center">
                                <span className="capitalize w-24 font-medium text-slate-700">{i===0 ? 'Hoy' : dayName}</span>
                                <div className="flex items-center">
                                    {getWeatherIcon(day.code)}
                                    <span className="ml-2 text-sm text-slate-500">{day.code <= 3 ? 'Soleado' : 'Nublado'}</span>
                                </div>
                                <div className="text-sm font-mono font-bold text-slate-800">
                                    {Math.round(day.max)}° <span className="text-slate-400">/ {Math.round(day.min)}°</span>
                                </div>
                            </div>
                        )
                    }) : <div className="p-4 text-center text-slate-400">Cargando clima...</div>}
                    </div>
            </div>
            
            {/* Pronunciation */}
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center"><Volume2 size={18} className="mr-2"/> Diccionario Exprés</h3>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
                {PRONUNCIATIONS.map((item, idx) => (
                <div key={item.word} className={`p-4 flex justify-between items-center ${idx !== PRONUNCIATIONS.length - 1 ? 'border-b border-slate-50' : ''}`}>
                    <div>
                        <div className="flex items-baseline space-x-2">
                            <span className="font-bold text-lg text-fjord-700">{item.word}</span>
                            <span className="text-xs text-slate-400 font-mono bg-slate-100 px-1 rounded">{item.simplified}</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1 italic">{item.meaning}</p>
                    </div>
                    <button 
                        onClick={() => playAudio(item.word)}
                        className={`p-3 rounded-full transition-colors ${playing === item.word ? 'bg-emerald-100 text-emerald-600 scale-110' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                    >
                    <Volume2 size={20} />
                    </button>
                </div>
                ))}
            </div>

                {/* Footer */}
                <div className="text-center py-8 text-slate-400 text-xs">
                <p className="font-medium">Hellesylt Guide 2026</p>
                <p>Actualizado el {UPDATE_DATE}</p>
                <p className="mt-1">© 2025 - 2026 Gonzalo Arenas de la Hoz</p>
            </div>

            {/* Rain Guide Modal */}
            {showRainGuide && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-lg max-h-[85vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col modal-content">
                        <div className="bg-slate-800 text-white p-4 flex justify-between items-center shrink-0">
                            <h3 className="font-bold flex items-center text-lg"><CloudRain className="mr-2 text-blue-300"/> Plan Táctico: Lluvia</h3>
                            <button onClick={() => setShowRainGuide(false)} className="p-1 hover:bg-white/10 rounded-full"><X/></button>
                        </div>
                        <div className="p-5 overflow-y-auto text-slate-700 text-sm leading-relaxed space-y-4">
                            <p className="italic bg-slate-100 p-3 rounded-lg border-l-4 border-slate-400">
                                "Cuatro horas (de 14:30 a 18:30) bajo la lluvia en Geiranger pueden hacerse eternas si no tienes un plan, o convertirse en una tarde 'hygge' maravillosa."
                            </p>
                            
                            <div>
                                <h4 className="font-bold text-fjord-600">14:30 – 15:00: La Ascensión Táctica (Sin mojarse)</h4>
                                <p className="mt-1">El error de novato: Subir andando por las escaleras bajo la lluvia. Llegarás empapado y sudando.</p>
                                <p className="mt-1 font-medium">La jugada maestra: Busca el autobús "Hop On Hop Off" o un taxi solo para subir al Norsk Fjordsenter.</p>
                            </div>

                            <div>
                                <h4 className="font-bold text-fjord-600">15:00 – 16:30: Refugio Cultural (Norsk Fjordsenter)</h4>
                                <p className="mt-1">Museo interactivo moderno sobre la vida en los fiordos. Cálido, baños impecables y cine panorámico.</p>
                                <p className="mt-1 text-slate-500">Costo: ~190 NOK (16-17€). Vale la pena por estar seco y entretenido.</p>
                            </div>

                            <div>
                                <h4 className="font-bold text-fjord-600">16:30 – 17:00: La Bajada Épica (Waterfall Walk)</h4>
                                <p className="mt-1">Baja andando hacia el puerto por las escaleras junto a la cascada Storfossen. Una cascada bajo la lluvia es el doble de impresionante y bajar es fácil (20 min). ¡Cuidado si resbala!</p>
                            </div>

                            <div>
                                <h4 className="font-bold text-fjord-600">17:00 – 17:45: La Recompensa (Geiranger Sjokolade)</h4>
                                <p className="mt-1">Entra en la fábrica de chocolate. Pide un chocolate caliente artesanal y un bombón. Sécate mientras ves llover.</p>
                                <p className="mt-1 text-slate-500">Costo: ~8-10€.</p>
                            </div>

                            <div>
                                <h4 className="font-bold text-fjord-600">17:45 – 18:15: La Sala de Espera Final</h4>
                                <ul className="list-disc ml-4 mt-1 space-y-1">
                                    <li><strong>Opción A (Gratis):</strong> Tienda de souvenirs gigante del puerto.</li>
                                    <li><strong>Opción B (Confort):</strong> Lobby del Hotel Havila (Wi-Fi y sofás).</li>
                                </ul>
                            </div>

                            <div className="bg-emerald-50 p-3 rounded border border-emerald-100 mt-2">
                                <h4 className="font-bold text-emerald-800 text-xs uppercase mb-1">Resumen Gastos (Aprox)</h4>
                                <p className="font-mono font-bold text-emerald-700">Total: ~35€ por persona</p>
                                <p className="text-xs text-emerald-600">Transporte (10€) + Museo (17€) + Chocolate (8€). Un triunfo evitar la hipotermia.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};