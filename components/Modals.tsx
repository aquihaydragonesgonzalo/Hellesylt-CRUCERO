import React, { useState, useEffect } from 'react';
import { X, Clock, Lightbulb, Headphones, Instagram, Camera, Ticket, StopCircle, Play } from 'lucide-react';
import { Activity, AudioTrack } from '../types';

interface ActivityDetailModalProps {
    activity: Activity;
    onClose: () => void;
    onOpenAudio: (activity: Activity) => void;
}

export const ActivityDetailModal: React.FC<ActivityDetailModalProps> = ({ activity, onClose, onOpenAudio }) => {
    if (!activity) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] modal-content">
                {/* Header */}
                <div className="bg-fjord-500 p-4 text-white relative">
                    <h3 className="text-xl font-bold pr-8">{activity.title}</h3>
                    <div className="flex items-center text-fjord-100 text-sm mt-1">
                        <Clock size={14} className="mr-1" />
                        {activity.startTime} - {activity.endTime}
                    </div>
                    <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 rounded-full p-1">
                        <X size={20} />
                    </button>
                </div>
                
                {/* Content */}
                <div className="p-5 overflow-y-auto">
                    <div className="mb-4">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Descripción</h4>
                        <p className="text-gray-700 leading-relaxed">{activity.fullDescription || activity.description}</p>
                    </div>
                    
                    <div className="mb-4 bg-orange-50 p-3 rounded-lg border border-orange-100">
                        <h4 className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-1 flex items-center">
                            <Lightbulb size={12} className="mr-1" /> Consejo Pro
                        </h4>
                        <p className="text-sm text-orange-800 italic whitespace-pre-wrap">{activity.tips}</p>
                    </div>

                    {/* Audio Guide Button */}
                    {activity.hasAudioGuide && (
                        <button 
                            onClick={() => onOpenAudio(activity)}
                            className="flex items-center justify-center w-full mb-4 p-4 rounded-xl bg-slate-800 text-white font-bold shadow-lg hover:bg-slate-900 transition-all active:scale-95 border border-slate-700"
                        >
                            <Headphones className="mr-3 text-emerald-400" size={24} />
                            <div>
                                <div className="leading-none">Escuchar Audioguía</div>
                                <div className="text-[10px] font-normal text-slate-400 mt-1">Narración Local y Leyendas</div>
                            </div>
                        </button>
                    )}
                    
                    {/* Instagram Button */}
                    {activity.instagramUrl && (
                        <a href={activity.instagramUrl} target="_blank" rel="noopener noreferrer" 
                           className="flex items-center justify-center w-full mb-4 p-3 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-bold shadow-md hover:shadow-lg transition-all active:scale-95">
                            <Instagram className="mr-2" size={20} />
                            Ver Fotos en Instagram
                        </a>
                    )}
                    
                    {/* Actions */}
                    <div className="space-y-3 pt-2">
                        {activity.webcamUrl && (
                            <a href={activity.webcamUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full p-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors">
                                <Camera className="mr-2" size={18} />
                                Ver Webcam en Vivo
                            </a>
                        )}
                        
                        {activity.ticketUrl && (
                            <a href={activity.ticketUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full p-3 bg-emerald-600 text-white rounded-xl font-bold shadow-md hover:bg-emerald-700 transition-colors">
                                <Ticket className="mr-2" size={18} />
                                Comprar Tickets Online
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

interface AudioGuideModalProps {
    tracks: AudioTrack[];
    title: string;
    onClose: () => void;
}

export const AudioGuideModal: React.FC<AudioGuideModalProps> = ({ tracks, title, onClose }) => {
    const [currentTrack, setCurrentTrack] = useState<number | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const playTrack = (track: AudioTrack) => {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(track.text);
        utterance.lang = 'es-ES';
        utterance.rate = 1.0;
        
        utterance.onend = () => {
            setIsPlaying(false);
            setCurrentTrack(null);
        };
        
        window.speechSynthesis.speak(utterance);
        setCurrentTrack(track.id);
        setIsPlaying(true);
    };

    const stopTrack = () => {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        setCurrentTrack(null);
    };

    useEffect(() => {
        return () => window.speechSynthesis.cancel();
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] modal-content border border-slate-700">
                {/* Header */}
                <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950">
                    <div className="flex items-center text-white">
                        <Headphones className="mr-2 text-emerald-400" />
                        <h3 className="font-bold text-lg">{title}</h3>
                    </div>
                    <button onClick={onClose} className="p-1 text-slate-400 hover:text-white"><X size={20}/></button>
                </div>

                {/* Player Content */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {tracks.map((track) => {
                        const isActive = currentTrack === track.id;
                        return (
                            <div key={track.id} className={`rounded-xl p-3 border transition-all ${isActive ? 'bg-slate-800 border-emerald-500 shadow-emerald-900/20 shadow-lg' : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800'}`}>
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className={`font-bold text-sm ${isActive ? 'text-emerald-400' : 'text-slate-200'}`}>{track.title}</h4>
                                    <button 
                                        onClick={() => isActive && isPlaying ? stopTrack() : playTrack(track)}
                                        className={`p-2 rounded-full ${isActive && isPlaying ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}`}
                                    >
                                        {isActive && isPlaying ? <StopCircle size={20}/> : <Play size={20}/>}
                                    </button>
                                </div>
                                {isActive && (
                                    <div className="mt-2 pt-2 border-t border-slate-700">
                                        <p className="text-xs text-slate-300 leading-relaxed font-serif animate-in fade-in">{track.text}</p>
                                        <div className="flex items-center justify-center mt-3 space-x-2">
                                            <span className="flex h-2 w-2 relative">
                                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                            </span>
                                            <span className="text-[10px] uppercase font-bold text-emerald-500 tracking-wider">Reproduciendo...</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
                
                <div className="p-3 bg-slate-950 text-center text-[10px] text-slate-500">
                    *El audio se genera usando la síntesis de voz de tu dispositivo.
                </div>
            </div>
        </div>
    );
};